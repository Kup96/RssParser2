/* eslint-disable @typescript-eslint/no-explicit-any */

import { IConfigParams } from '../interfaces/config-params';

type PropertyOf<T> = any;

export class ConfigService<CT = any> {
  private readonly currentConfig: any = undefined;
  private readonly windowConfig: any = (window as any)._env_;

  public get<PT extends PropertyOf<CT>>(
    paramName: PT,
    defaultValue?: any
  ): any | undefined {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return (
      this.getFromWindowConfig(paramName) ||
      this.getFromBuildTimeConfig(paramName) ||
      defaultValue
    );
  }

  private getFromWindowConfig<PT extends PropertyOf<CT>>(
    paramName: PT
  ): any | undefined {
    return this.windowConfig ? this.windowConfig[paramName] : undefined;
  }

  private getFromBuildTimeConfig<PT extends PropertyOf<CT>>(
    paramName: PT
  ): any | undefined {
    return this.currentConfig ? this.currentConfig[paramName] : undefined;
  }
}

export const configService = new ConfigService<IConfigParams>();
export default configService;
