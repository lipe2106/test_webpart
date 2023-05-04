import * as React from 'react';
import { IImprovementFormProps } from './IImprovementFormProps';
import styles from './ImprovementForm.module.scss';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {Label} from 'office-ui-fabric-react/lib/Label';
import {SPFI} from '@pnp/sp/presets/all';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import "@pnp/sp/items/get-all";
import "@pnp/sp/lists/web"
import {PrimaryButton} from 'office-ui-fabric-react/lib/Button';
import { getSP } from '../../../pnpjsConfig';
import { useEffect, useState } from 'react';
import { ImprovementForm } from '../../../interfaces';

const Form = (props:IImprovementFormProps) => {

    const LIST_NAME = "Intranet";
    let _sp: SPFI = getSP(props.context);

    const [formItems, setFormItems] = useState<ImprovementForm[]>([])

    const getFormItems = async () => {
        const items = _sp.web.lists.getByTitle(LIST_NAME).items();

        setFormItems((await items).map((item: any) => {
            return {
                Title: item.Title, 
                Description: item.Description,
                Site: item.Site,
                Contact: item.Contact
            }
        }));
    }

    useEffect(() => {
        getFormItems();
    })

    return(
        <div>
            <h1>Improvement Form</h1>
            <pre>{JSON.stringify(formItems)}</pre>
            <p>Anything on the new intranet in need of an update, part of the page not working or something doesn't feel logical? Please send in an improvement suggestion and we will have a look. Thank you!</p>
            <form>
                <div>
                    <Label>Title</Label>
                    <TextField
                       // value={this.state.Title}
                        id="Title"
                        placeholder='Title of your suggestion'
                      //  onChange={this.onchange}
                    />
                    <p></p>
                </div>
                <div>
                    <Label>Description</Label>
                    <TextField
                      //  value={this.state.Description}
                        id="Description"
                        placeholder='Description of the improvement suggestion'
                        multiline
                      //  onChange={(e) => this.onchange(e)}
                    />
                    <p></p>
                </div>
                <div>
                    <Label>Site URL</Label>
                    <TextField
                     //   value={this.state.Site}
                        id="Site"
                        placeholder="Site URL to the page that's in need of improvement"
                      //  onChange={(e) => this.onchange(e)}
                    />
                    <p></p>
                </div>
                <div>
                    <Label>Contact Information</Label>
                    <TextField
                     //   value={this.state.Contact}
                        id="Contact"
                        placeholder='Your name or email as contact information if we have further questions'
                     //   onChange={(e) => this.onchange(e)}
                    />
                    <p></p>
                </div>
                <div>
                    <p></p>
                <PrimaryButton className={styles.submitBtn}  /*onClick={(e) => this.submit(e)}*/ text="Submit" />
                </div>
            </form>
            
        </div>
    );
}


export default Form




