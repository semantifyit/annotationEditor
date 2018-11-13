import * as React from 'react';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';

import { ISingleOption } from './DropDownSelect';
import Annotation from './Annotation';
import {
  fetchDSbyId,
  fetchPublicDS,
  IDSMap,
  transformDSToShacl,
} from '../helpers/semantify';
import { VocabContext, IContext } from '../helpers/VocabContext';

interface IState {
  createdType: null | string;
  selectedValue: string;
  bases: null | IDSMap[];
}

class AnnotationTemplate extends React.Component<{}, IState> {
  public static contextType = VocabContext;
  public context: IContext;
  public state: IState = {
    createdType: null,
    selectedValue: '',
    bases: null,
  };

  public async componentDidMount() {
    await this.context.vocab.addDefaultVocabs('schema', 'schema-pending');
    const DS = await fetchPublicDS();
    this.setState({ bases: DS });
  }

  public async createBase(dsID: string) {
    const ds = await fetchDSbyId(dsID);
    if (!ds) {
      return;
    }
    const shaclDS = transformDSToShacl(ds.content);
    await this.context.vocab.addVocab(
      ds.name,
      JSON.stringify(shaclDS),
      'application/ld+json',
    );
    this.setState({
      createdType: ds.content['dsv:class'][0]['dsv:baseClass']['@id'],
    });
  }

  public render() {
    if (!this.state.bases) {
      return <h1>Loading ...</h1>;
    }
    return (
      <div>
        <section
          className="jumbotron text-center"
          style={{ backgroundColor: '#fff' }}
        >
          <div className="container">
            <h1 className="jumbotron-heading">
              Create an annotation from a template
            </h1>
          </div>
        </section>
        <div className="row" style={{ margin: 0 }}>
          <h4>Choose a template:</h4>
          <div className="col-sm-4 col-sm-offset-4">
            <Select
              options={this.state.bases
                .map((c) => ({
                  value: c.id,
                  label: c.name,
                }))
                .sort((a, b) => a.label.localeCompare(b.label))}
              onChange={(e: ISingleOption) => this.createBase(e.value)}
              isSearchable={true}
            />
          </div>
        </div>
        <br />
        <div>
          {this.state.createdType && (
            <Annotation typeID={this.state.createdType} generateButton={true} />
          )}
        </div>
      </div>
    );
  }
}

export default AnnotationTemplate;
