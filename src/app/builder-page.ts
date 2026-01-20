import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, inject, makeStateKey, signal, TransferState } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BuilderContent, Content, fetchOneEntry, getBuilderSearchParams } from "@builder.io/sdk-angular";
import { firstValueFrom } from "rxjs";
import { CUSTOM_COMPONENTS } from "./builder-registry";

@Component({
  selector: 'app-builder-page',
  imports: [Content],
  template: `
    @if (content(); as content) {
      <builder-content
        [model]="model"
        [content]="content"
        [apiKey]="apiKey"
        [customComponents]="customComponents"
      />
    }
  `,
  host: {
    class: "contents",
  },
})
export class BuilderPage {
  content = signal<BuilderContent | null>(null);
  customComponents = CUSTOM_COMPONENTS;
  model = 'page';
  apiKey = 'f64f806ae8274dff8cec61b2e7004a56';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private transferState = inject(TransferState);

  _httpClientFetch = async (url: string, options?: RequestInit) => {
    return firstValueFrom(
      this.http.request<any>(options?.method || 'GET', url, {
        body: options?.body,
        headers: options?.headers as any,
        ...(options || {}),
        observe: 'response',
        responseType: 'json',
      })
    ).then((response: HttpResponse<any>) => {
      return {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        json: () => Promise.resolve(response.body),
      };
    });
  };

  async ngOnInit() {
    const urlPath = this.router.url.split('?')[0] || '';
    const queryParams = this.route.snapshot.queryParams;
    const searchParams = getBuilderSearchParams(queryParams);

    const cacheKey = makeStateKey<BuilderContent | null>(
      `builder-content-${urlPath}-${JSON.stringify(searchParams)}`
    );

    const cachedContent = this.transferState.get(cacheKey, null);
    if (cachedContent) {
      this.content.set(cachedContent);
      return;
    }

    const content = await fetchOneEntry({
      apiKey: this.apiKey,
      model: this.model,
      userAttributes: { urlPath },
      options: { ...searchParams },
      fetch: this._httpClientFetch,
    });

    this.transferState.set(cacheKey, content);
    this.content.set(content);
  }
}
