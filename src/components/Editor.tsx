import React from "react";
import SolidAuth from 'solid-auth-client';

export default class Editor extends React.Component {
  state: any
  constructor(props: any) {
    super(props);
    this.state = {url: 'https://michielbdejong.inrupt.net/private/some-doc.txt'};

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleUrlChange(event: any) {
    this.setState({url: event.target.value});
  }

  handleTextChange(event: any) {
    this.setState({text: event.target.value});
  }

  handleLoad(event: any) {
    const doc = SolidAuth.fetch(this.state.url);
    event.preventDefault();
    doc.then(async (response) => {
      const text = await response.text();
      console.log('fetched', text);
      this.setState({ text });
    });
  }

  handleSave(event: any) {
    SolidAuth.fetch(this.state.url, {
      method: 'PUT',
      body: this.state.text,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <form>
        <div>
          <label>
            URL:
            <input type="text" value={this.state.url} onChange={this.handleUrlChange} />
          </label>
          <button className="is-default button" onClick={this.handleLoad}>Load</button>
          <button className="is-warning button" onClick={this.handleSave}>Save</button>
        </div>
        <div>
         <textarea value={this.state.text} onChange={this.handleTextChange} cols={40} rows={10} />
        </div>
      </form>
    );
  }
}
