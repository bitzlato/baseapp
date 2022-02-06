import * as React from 'react';

export class ErrorWrapper extends React.Component<{}, { error: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { error: '' };
  }

  static getDerivedStateFromError(error: string | Error) {
    return { error: error.toString() };
  }

  componentDidCatch(error: Error | string) {
    this.setState({ error: error.toString() });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <div>{error}</div>;
    }
    return this.props.children;
  }
}
