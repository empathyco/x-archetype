import { DEPENDENCIES, EmpathyAdapterConfig, EndpointsService } from '@empathy/search-adapter';
import { inject, injectable } from 'inversify';

@injectable()
export class EmpathyEndpointsService implements EndpointsService {
  public constructor(@inject(DEPENDENCIES.config) private readonly config: EmpathyAdapterConfig) {}

  buildUrl(rawUrl: string): string {
    if (!rawUrl.startsWith('http')) {
      rawUrl = `https://${rawUrl}`;
    }

    return rawUrl
      .replace(/{env}/g, this.config.env === 'live' ? '' : `${this.config.env}`)
      .replace(/{instance}/g, this.config.instance);
  }
}
