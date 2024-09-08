import React, { Component } from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class CustomErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // 업데이트된 상태를 반환하여 에러 UI를 표시합니다.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 에러가 발생했을 때 표시할 UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default CustomErrorBoundary;
