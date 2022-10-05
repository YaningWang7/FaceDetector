import {React, Component} from 'react';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        console.log(event.target.value);
        this.setState({registerPassword: event.target.value})
    }

    onSubmitRegister = () => {
        const { onRouteChange, loadUser } = this.props;
        fetch('https://fathomless-waters-67750.herokuapp.com/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword,
            })
        })
        .then(res => res.json())
        .then(user => {
            console.log(user);
            if(user.id) {
                loadUser(user);
                onRouteChange('home');
            }else {
                throw new Error("username or password already existed")
            }  
        })
        .catch(error => console.error(error));
    }

    render(){
        
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 center" style={{boxShadow:"4px 4px 8px 0px white"}}>
                <main className="pa5">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-white hover-white w-100" type="text" name="name"  id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-white hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-white hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                            <div className="">
                                <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                            </div>
                        </fieldset>
                    </div>
                </main>
            </article>    
        );
    }
    
}

export default Register;