export class Config {
  static readonly isDevelopment = import.meta.env.MODE === 'development'
  static readonly BaseUri = Config.isDevelopment
    ? 'https://api.xxxxxxx.com'
    : 'xxxxxx'
}
