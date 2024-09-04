declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_APP_JS_KEY: string;
    }
}

// 또는, 안전하게 기본값을 제공하기
const jsKey: string = process.env.NEXT_PUBLIC_APP_JS_KEY ?? "94b280b79784adac1bdf099a6538c68a";

// 타입 단언을 통해 사용하기
const jsKey: string = process.env.NEXT_PUBLIC_APP_JS_KEY as string;