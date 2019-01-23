import React from "react";
import ReactDOM from "react-dom";

import './App.css';
import './css/bootstrap.min.css';
import './css/megadraft.css';

import {DraftJS, MegadraftEditor, editorStateFromRaw} from "megadraft";
import plugin from "megadraft-related-articles-plugin";
// this is the default LinkInput that handles `LINK`-entities:
import LinkInput from "megadraft/lib/entity_inputs/LinkInput";

// you can create a custom entity input component (see below)
//import PageLinkInput from "./path/to/PageLinkInput";

import logo from './logo.svg';

const entityInputs = {
  LINK: LinkInput,
  INTERNAL_PAGE_LINK: LinkInput
}
const actions = [
/*
  {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
  {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
  // these actions correspond with the entityInputs above
  {type: "entity", label: "Link", style: "link", entity: "LINK", icon: icons.LinkIcon},
  {type: "entity", label: "Page Link", style: "link", entity: "INTERNAL_PAGE_LINK", icon: MyPageLinkIcon},

  {type: "separator"},
  {type: "block", label: "UL", style: "unordered-list-item", icon: icons.ULIcon},
  {type: "block", label: "OL", style: "ordered-list-item", icon: icons.OLIcon},
  {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon},
  {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
*/
];

const API = 'http://localhost:8099';
const DEFAULT_QUERY = '/Content/list/100';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      content: [{
        "id": 1,
        "name": "Widget Adapter",
        "keySpec": "{keyOwner:111, keySource:'session | system'}",
        "contentData": "The Old Man and The See",
        "releaseDate": "1970-01-01T00:00:00.000Z",
        "keyVersion": 0,
        "ownerId": 0,
        "createdDate": "1970-01-01T00:00:00.000Z",
        "modifiedDate": "1970-01-01T00:00:00.000Z",
        "list": null
      }] ,
      editorState: editorStateFromRaw({
        entityMap: {},
        blocks: [
          {
            key: "ag6qs",
            text: "Project List",
            type: "header-two",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          },
          {
            key: "9vgd",
            text: "Yes",
            type: "atomic",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {
              type: "related-articles",
              articles: [{key: "abcde"}]
            }
          },
          {
            key: "zvgd",
            text: "Hello Beautiful",
            type: "header-one",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {
              type: "related-articles",
              articles: [{key: "abcde"}]
            }
          }
        ]
      })
    };
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  handleBlockNotFound(block) {
    return {
      blockComponent: (props) => <pre>plugin not found {props.data.type}</pre>
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    // alert(API + DEFAULT_QUERY)
    fetch(API + DEFAULT_QUERY)
     .then(response => response.json())
     .then(data => this.setState({ content: data, isLoading: false }))
     .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { user, isLoading, error } = this.state;

    if (error) {
      return <h3>{error.message}</h3>;
    }

    return (
      <div  id="container">
          <img src={logo} class="App-logo" alt="logo" />
          <h1>Starter Bank</h1>
          <br/><br/>
          <a href='http://localhost:8099/'>Service URL</a>

          <MegadraftEditor
              plugins={[plugin]}
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleBlockNotFound={this.handleBlockNotFound}
              actions={actions}
              entityInputs={entityInputs}
          />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;
