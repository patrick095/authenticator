export interface IMail {
    to ?: string,
    subject ?: string,
    message ?: string
}
export interface IConfig {
  host: string | undefined,
  port: number,
  secure: boolean,
  auth: {
      user: string | undefined,
      pass: string | undefined
  }
}