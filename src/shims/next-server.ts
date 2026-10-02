/** Minimal NextResponse so existing route handlers can return Response objects. */
export class NextResponse extends Response {
  static json(data: unknown, init?: ResponseInit) {
    return Response.json(data, init);
  }
}
