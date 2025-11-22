import { emitter } from "./emitter";


export async function GET(req: Request) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  // Define event handlers so we can remove them later
  const changeHandler = (data: unknown) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
  };

  const closeHandler = () => {
    console.log("closing");
    cleanup();
    writer.close();
  };

  const errorHandler = (error: Error) => {
    console.error("error", error);
    cleanup();
    writer.abort();
  };

  // Cleanup function to remove all listeners
  const cleanup = () => {
    emitter.off("change", changeHandler);
    emitter.off("close", closeHandler);
    emitter.off("error", errorHandler);
  };

  // Listen for changes
  emitter.on("change", changeHandler);
  emitter.on("close", closeHandler);
  emitter.on("error", errorHandler);

  // Detect client disconnect
  req.signal.addEventListener("abort", () => {
    console.log("client disconnected");
    cleanup();
    writer.close().catch(() => {
      // Writer may already be closed
    });
  });

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });

}

