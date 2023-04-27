import * as React from 'react';
import { IImprovementFormProps } from './IImprovementFormProps';
import {PeoplePicker, PrincipalType} from '@pnp/spfx-controls-react/lib/PeoplePicker';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {Label} from 'office-ui-fabric-react/lib/Label';
import {Web} from '@pnp/sp/presets/all';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import {PrimaryButton} from 'office-ui-fabric-react/lib/Button';

export interface IStates {
    Items: any;
    ID: any;
    EmployeeName: any;
    EmployeeNameId: any;
    Date: any;
    Title: any;
    Description: any;
}

export default class test_improvementform extends React.Component<IImprovementFormProps, 
IStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            Items: [],
            EmployeeName: "",
            EmployeeNameId: 0,
            ID: 0,
            Date: null,
            Title: "",
            Description: ""
        };
    }

    public _getPeoplePickerItems = async (items:any[]) => {

        if(items.length > 0) {
            this.setState({EmployeeName:items[0].text});
            this.setState({EmployeeNameId:items[0].id});
        }
        else {
            //ID = 0;
            this.setState({EmployeeNameId: ""});
            this.setState({EmployeeName: ""});
        }
    }

  //  public onchange(value, stateValue) {
   //     let state = {};
   //     state[stateValue] = value;
   //     this.setState(state);
   // }

    private async SubmitImprovement() {
        let web = Web(this.props.webURL);
        await web.lists.getByTitle("Intranet Improvements").items.add({
            Employee_x0020_NameId:this.state.EmployeeNameId,
            Date: new Date(this.state.Date),
            Title: this.state.Title,
            Description: this.state.Description,
        }).then(i => {
            console.log(i);
        });
        alert("Improvement submitted");
        this.setState({EmployeeName:"", Date:null, Title:"", Description:""});
    }

    public render(): React.ReactElement<IImprovementFormProps> {
        return(
            <div>
                <h1>Test Improvement Form</h1>
                <form>
                    <div>
                        <Label>Title</Label>
                        <TextField
                            value={this.state.Title}
                            //multiline onChanged={(value) => this.onchange(value, "Title")}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <TextField
                            value={this.state.Description}
                            //multiline onChanged={(value) => this.onchange(value, "Description")}
                        />
                    </div>
                    <div>
                        <Label>Your name</Label>
                        <PeoplePicker
                            context={this.props.context}
                            personSelectionLimit={1}
                            // defaultSelectedUsers={this.state.EmployeeName===""?[]:this.state.EmployeeName}
                            required={false}
                            onChange={this._getPeoplePickerItems}
                            defaultSelectedUsers={[this.state.EmployeeName?this.state.EmployeeName:""]}
                            showHiddenInUI={false}
                            principalTypes={[PrincipalType.User]}
                            resolveDelay={1000}
                            ensureUser={true}
                        />
                    </div>
                    <div>
                        <PrimaryButton text="Submit" onClick={() => this.SubmitImprovement()}/>
                    </div>
                </form>
            </div>
        );
    }
};