import React, { PropsWithChildren } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops... Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
