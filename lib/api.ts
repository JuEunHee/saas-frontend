export type RetryerOptions = {
    retries?: number;
    delay?: number;
    retryCondition?: (error: any) => boolean;
};

export type FetchWithRetryOptions = {
    timeout?: number;
    requestInit?: RequestInit;
    retryerOptions?: RetryerOptions;
};

/**
 * Timeout
 */
export async function fetchWithTimeout(
    url: string,
    timeout: number = 5000,
    options?: RequestInit
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
  
      fetch(url, { ...options, signal: controller.signal })
        .then((res) => {
          clearTimeout(id);
          resolve(res);
        })
        .catch((err) => {
          clearTimeout(id);
          reject(err);
        });
    });
  }
  
/**
 * Retryer
 */
export async function retryer<T>(
    fn: () => Promise<T>,
    options: RetryerOptions = {}
): Promise<T> {
    const {
        retries = 3,
        delay = 1000,
        retryCondition = () => true,
    } = options;

    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          return await fn();
        } catch (error) {
          lastError = error;
          const shouldRetry = retryCondition(error);

          if (attempt < retries && shouldRetry) {
              await new Promise((res) => setTimeout(res, delay));
          } else {
              break;
          }
        }
    }

    throw lastError;
}

export async function fetchWithTimeoutAndRetry(
  url: string,
  options: {
    timeout: number;
    retryerOptions: {
      retries: number;
      delay: (attempt: number) => number; // 지연 시간을 함수로 설정
    };
  }
): Promise<any> {
  const { timeout, retryerOptions } = options;

  for (let attempt = 0; attempt <= retryerOptions.retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === retryerOptions.retries) {
        throw error; // 재시도 횟수를 초과하면 에러를 던짐
      }

      const delay = retryerOptions.delay(attempt);
      console.warn(`Retrying... Attempt ${attempt + 1} after ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}