import axios from "axios";

export const api = axios.create({
    baseURL : 'http://localhost:8081/api',
    withCredentials: true,
});

//로그인 인터셉트(세션을 처리...)
axios.interceptors.request.use(
    (config) => {
        // 여기서 쿠키를 읽어 Authorization 헤더에 포함
        const cookies = document.cookie.split('; ').reduce((acc, current) => {
            const [name, value] = current.split('=');
            acc[name] = value;
            return acc;
        }, {} as Record<string, string>);

        // 세션 ID를 Authorization 헤더에 추가
        if (cookies['sessionId']) {
            config.headers['Authorization'] = `Bearer ${cookies['sessionId']}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => {
        // 응답 처리
        return response;
    },
    (error) => {
        // 오류 처리
        if (axios.isAxiosError(error)) {
            // 예: 401 Unauthorized 응답 처리
            if (error.response?.status === 401) {
                // 로그아웃 처리 또는 사용자에게 로그인 요구
                console.error('Unauthorized. Please login again.');
            }
        }
        return Promise.reject(error);
    }
);