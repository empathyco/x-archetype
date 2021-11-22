import { DEPENDENCIES, EmpathyAdapterConfig, EndpointsService } from '@empathyco/x-adapter';
import { inject, injectable } from 'inversify';

@injectable()
export class EmpathyEndpointsService implements EndpointsService {
  public constructor(@inject(DEPENDENCIES.config) private readonly config: EmpathyAdapterConfig) {}

  buildUrl(rawUrl: string): string {
    if (!rawUrl.startsWith('http')) {
      rawUrl = `https://${rawUrl}`;
    }

    if (!rawUrl.includes('relatedtags')) {
      if (this.config.env === 'test') {
        return rawUrl.replace(/{env}/g, 'search.internal.test.empathy.co');
      } else if (this.config.env === 'staging') {
        return rawUrl.replace(/{env}/g, 'api.staging.empathy.co/search/v1');
      } else {
        return rawUrl.replace(/{env}/g, 'api.empathy.co/search/v1');
      }
    } else {
      if (this.config.env === 'test') {
        return rawUrl.replace(/{env}/g, 'beacon-api.internal.test');
      } else {
        return rawUrl.replace(/{env}/g, 'api.staging');
      }
    }
  }
}
