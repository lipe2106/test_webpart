import * as React from 'react';
import { IImprovementFormProps } from './IImprovementFormProps';
import styles from './ImprovementForm.module.scss';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {Label} from 'office-ui-fabric-react/lib/Label';
import {Web} from '@pnp/sp/presets/all';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import {PrimaryButton} from 'office-ui-fabric-react/lib/Button';

export interface IStates {
    Title: any;
    Description: any;
    Site: any;
    Contact: any;
}

export default class test_improvementform extends React.Component<IImprovementFormProps, 
IStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            Title: "",
            Description: "",
            Site: "",
            Contact: ""
        }

        this.onchange = this.onchange.bind(this);
    }

    public onchange(e: any) {
        let state : any = {}
        state[e.target.id] = e.target.value;
        this.setState(state);
    }

    //public onchange(value : any, stateValue : any) {
    //    let state : any = {};
    //    state[stateValue] = value;
    //    this.setState(state);
    //}

    private async SubmitImprovement() {
        let web = Web(this.props.webURL);
        await web.lists.getByTitle("Intranet Improvements").items.add({
            Title: this.state.Title,
            Description: this.state.Description,
            Site: this.state.Site,
            Contact: this.state.Contact
        }).then(i => {
            console.log(i);
        });
        alert("Improvement submitted");
        this.setState({Title:"", Description:"", Site: "", Contact: ""});
    }

    public render(): React.ReactElement<IImprovementFormProps> {
        return(
            <div>
                <h1>Test Improvement Form</h1>
                <p>Anything on the new intranet in need of an update, part of the page not working or something doesn't feel logical? Please send in an improvement suggestion and we will have a look. Thank you!</p>
                <form>
                    <div>
                        <Label>Title</Label>
                        <TextField
                            value={this.state.Title}
                            id="Title"
                            placeholder='Title of your suggestion'
                           onChange={this.onchange}
                        />
                        <p></p>
                    </div>
                    <div>
                        <Label>Description</Label>
                        <TextField
                            value={this.state.Description}
                            id="Description"
                            placeholder='Description of the improvement suggestion'
                            multiline
                            onChange={(e) => this.onchange(e)}
                        />
                        <p></p>
                    </div>
                    <div>
                        <Label>Site URL</Label>
                        <TextField
                            value={this.state.Site}
                            id="Site"
                            placeholder="Site URL to the page that's in need of improvement"
                            onChange={(e) => this.onchange(e)}
                        />
                        <p></p>
                    </div>
                    <div>
                        <Label>Contact Information</Label>
                        <TextField
                            value={this.state.Contact}
                            id="Contact"
                            placeholder='Your name or email as contact information if we have further questions'
                            onChange={(e) => this.onchange(e)}
                        />
                        <p></p>
                    </div>
                    <div>
                        <p></p>
                        <PrimaryButton className={styles.submitBtn} text="Submit" onClick={() => this.SubmitImprovement()}/>
                    </div>
                    <div>
                        <p>Here will the message appear</p>
                    </div>
                </form>
            </div>
        );
    }
};