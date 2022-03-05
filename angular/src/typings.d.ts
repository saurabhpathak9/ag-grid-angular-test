/* SystemJS module definition */
declare var module: NodeModule;
declare module 'stompjs';
declare module 'sockjs-client';
interface NodeModule {
  id: string;
}
declare module 'worker-loader!*' {
  const content: any;
  export = content;
}