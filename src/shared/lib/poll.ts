interface PollOptions {
  intervalMs?: number;
  timeoutMs?: number;
}

export async function pollUntil<T>(
  fetchFn: () => Promise<T>,
  isDone: (result: T) => boolean,
  { intervalMs = 1500, timeoutMs = 30_000 }: PollOptions = {}
): Promise<T> {
  const start = Date.now();
  let result = await fetchFn();
  while (!isDone(result)) {
    if (Date.now() - start > timeoutMs) {
      throw new Error("처리 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.");
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    result = await fetchFn();
  }
  return result;
}
