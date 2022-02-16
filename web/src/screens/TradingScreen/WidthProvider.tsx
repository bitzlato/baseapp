/* eslint-disable react/destructuring-assignment */
import { Component, ComponentType, createRef } from 'react';
import { ResponsiveProps } from 'react-grid-layout';
import cn from 'classnames';

export function WidthProvider(ComposedComponent: ComponentType<ResponsiveProps>) {
  return class extends Component<ResponsiveProps, { width: number }> {
    private mounted = false;

    private elementRef = createRef<HTMLDivElement>();

    private intervalId: number | undefined;

    constructor(props: ResponsiveProps) {
      super(props);
      this.state = {
        width: 1280,
      };
    }

    componentDidMount() {
      this.mounted = true;
      window.addEventListener('resize', this.onResize);
      this.onResize();
      this.intervalId = window.setInterval(this.onResize, 20);
    }

    componentWillUnmount() {
      this.mounted = false;
      window.removeEventListener('resize', this.onResize);
      window.clearInterval(this.intervalId);
    }

    private onResize = () => {
      if (this.mounted) {
        const node = this.elementRef.current;
        if (
          node instanceof HTMLElement &&
          node.offsetWidth &&
          this.state.width !== node.offsetWidth
        ) {
          this.setState({ width: node.offsetWidth });
          window.clearInterval(this.intervalId);
        }
      }
    };

    render() {
      if (!this.mounted) {
        return (
          <div
            className={cn(this.props.className, 'react-grid-layout')}
            style={this.props.style}
            ref={this.elementRef}
          />
        );
      }

      return <ComposedComponent innerRef={this.elementRef} {...this.props} {...this.state} />;
    }
  };
}
