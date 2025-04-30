import { fetchWithTimeoutAndRetry } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function TimeoutTestPage() {
    try {
      const data = await fetchWithTimeoutAndRetry(
        'https://deelay.me/5000/https://jsonplaceholder.typicode.com/posts/1',
        //'https://deelay.me/5000/https://jsonplaceholder.typicode.com/posts/1',
        {
          timeout: 3000, // 타임아웃을 3초로 설정
          retryerOptions: {
            retries: 3, // 재시도 횟수를 3으로 설정
            delay: (attempt) => {
              const baseDelay = 1000; // 기본 지연 시간 (1초)
              const jitter = Math.random() * 500; // 0~500ms의 랜덤 지터
              return baseDelay * Math.pow(2, attempt) + jitter; // 지수 백오프 + 지터
            },
          },
        }
      );

      console.log('Fetched data:', data);

      if (!data) return <p>로딩 중...</p>;

      return (
        <section className="flex-1 p-4 lg:p-8">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
            Admin Accounts
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {data.body}
            </CardContent>
          </Card>
        </section>
      );
    } catch (error) {
      return (<p>데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요!!</p>);
    }
}