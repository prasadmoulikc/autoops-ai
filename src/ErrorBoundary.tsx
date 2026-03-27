import React from "react";

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div style={{color: "white", padding: 20, backgroundColor: "black", minHeight: "100vh"}}>Something went wrong. Reload.</div>;
    }
    return this.props.children;
  }
}
