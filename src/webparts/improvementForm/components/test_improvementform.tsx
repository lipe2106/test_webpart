import * as React from 'react';
import { IImprovementFormProps } from './IImprovementFormProps';
import styles from './ImprovementForm.module.scss';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {Label} from 'office-ui-fabric-react/lib/Label';
import {PrimaryButton} from 'office-ui-fabric-react/lib/Button';

export interface IStates {
    Search: any;
    Selected: any;
}

export default class test_improvementform extends React.Component<IImprovementFormProps, 
IStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            Search: "",
            Selected: ""
        }

        this.selected = this.selected.bind(this);
        this.search = this.search.bind(this);
        this.onchange = this.onchange.bind(this);
    }

    public onchange(e: any) {
        let state : any = {}
        state[e.target.id] = e.target.value;
        this.setState(state);
    }

    public selected(e: any) {
        let state : any = {}
        state["Selected"] = e.target["value"];
        this.setState(state);
    }

    private async search() {
        window.open("http://app02.borgwarner.com/ShareDocs/Search/Pages/Docs.aspx?k=" + this.state.Selected + ":" + this.state.Search + "&s=ShareDocs");
    }

    public render(): React.ReactElement<IImprovementFormProps> {
        return(
            <div>
                <h1>Test Improvement Form</h1>
                <form>
                    <div>
                        <p></p>
                        <Label>Search</Label>
                        <select onChange={(e) => this.selected(e)}>
                            <option disabled selected>Filter search</option>
                            <option id="DlcDocId" value="DlcDocId">Document ID</option>
                            <option id="Title" value="Title">Title</option>
                            <option id="Unfilter" value="">Search without filter</option>
                        </select>
                        <TextField
                            value={this.state.Search}
                            id="Search"
                            placeholder='Search'
                            onChange={(e) => this.onchange(e)}
                        />
                        <PrimaryButton className={styles.submitBtn}  onClick={(e) => this.search()} text="Search" />
                    </div>
                    <div>
                        <p>Here will the message appear</p>
                    </div>
                </form>
            </div>
        );
    }
}