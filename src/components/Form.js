import React, { Component } from "react";
// import { ScreenClassRender } from "react-grid-system";

class Form extends Component {
    state = {
        name: "",
        surname: "",
        pesel: "",
        errorName: "",
        errorSurname: "",
        errorPesel: "",
        birthDate:"",
        isValidated: false
    };
    // creates a data and pushes it to file db.json 
    createNewContact = () => {
        const { name, surname, pesel } = this.state;

        const newContact = {
            name: name,
            surname: surname,
            pesel: pesel
        };

        fetch("http://localhost:4000/contactForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContact)
        })
            .then(response => response.json())
            .then(newContact => {
                console.log({ newContact });
            });
    };
    // handle change of state
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    //validation 
    validate = () => {
        const { name, surname, pesel } = this.state;
        let isValid = true;

        //name validation 
        if (name === "" || name.length > 20) {
            isValid = false;
            this.setState({ errorName: "The name should have 1-20 marks" });
        } else {
            this.setState({ errorName: "" })
        }
        //surname validation
        if (surname === "" || surname.length > 30) {
            isValid = false;
            this.setState({ errorSurname: "The surname should have 1-30 marks" });
        } else {
            this.setState({ errorSurname: "" });
        }
        //pesel validation
        //regex
        const reg= /^[0-9]{11}$/;
        if(reg.test(pesel) == false){
            isValid = false;
            console.log("pesel should have 9 numbers")
            this.setState({ errorPesel: "Pesel should have 9 numbers" });
        } else {
            //check pesel
            let digits = ("" +pesel).split("");
            if((parseInt(pesel.substring(4,6)) > 31) || (parseInt(pesel.substring(2,4)) > 12))
            isValid = false;

            let checksum = (1*parseInt(digits[0]) + 3*parseInt(digits[1]) + 7*parseInt(digits[2]) + 9*parseInt(digits[3]) + 1*parseInt(digits[4]) + 3*parseInt(digits[5]) + 7*parseInt(digits[6]) + 9*parseInt(digits[7]) + 1*parseInt(digits[8]) + 3*parseInt(digits[9]))%10;
            if(checksum==0) checksum = 10;
            checksum = 10 - checksum;
            //if test are ok, set is Valid to true
            if (parseInt(digits[10])==checksum) {
                isValid = true;
            }

        }


        //return
        //helping function
        console.log("isValid is" + isValid)
        return isValid;

    };
    //handle submit
    handleSubmit = event => {
        event.preventDefault();
        //validate function on
        this.validate();
        //if it works, set new State
        if (this.validate()) {
            this.setState({
                isValidated: true,
                name: "",
                surname: "",
                pesel: ""
            });
            //help function
            console.log("Zwalidowano");
            //utwórz nowy kontakt w bazie danych
            this.createNewContact();
            // this.peselDecode();
        };
    };
    //decode pesel
    peselDecode = () => {
        const pesel = this.state.pesel;
        //cutting numbers from string of numbers
        let year = parseInt(pesel.substring(0,2), 10);
        let month = parseInt(pesel.substring(2,4), 10)-1;
        let day = parseInt(pesel.substring(4,6), 10);

       //adding numbers 
       if(month>80){
           year = year + 1800;
           month = month -80;
       }
       else if (month > 60) {
           year = year + 2200;
           month = month - 60;
       }
       else if (month > 40) {
           year = year + 2100;
           month = month -40;
       }
       else if ( month > 20) {
           year = year +2000;
           month = month -20;
       }
       else {
           year += 1900;
       }
       //date checkout
    //    console.log("year", year)
    //    console.log("month", month)
    //    console.log("day", day)

       //birth date
       let birthDate = new Date();
       birthDate.setFullYear(year, month, day);
       console.log(birthDate)

       this.setState({
           birthDate: birthDate
       })
    }


    render() {
        const {
            name, surname, pesel, errorName, errorSurname, errorPesel, birthDate
        } = this.state;

        return (
            <>
            <form>
                <div className="name">
                    <label>Your NAME</label>
                    <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    placeholder="John"
                    />
                </div>
                <div className="surname">
                    <label>Your SURNAME</label>
                    <input
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={this.handleChange}
                    placeholder="Doe"
                    />
                </div>
                <div className="pesel">
                    <label>Your PESEL</label>
                    <input
                    type="text"
                    name="pesel"
                    value={pesel}
                    onChange={this.handleChange}
                    placeholder="1223456789"
                    />
                </div>
                <div className="birth-date">
                    <span>Your birth date: </span>
                    <span>{birthDate}</span>
                </div>
            </form>
            <button
            className="submit"
            type="submit"
            value="submit"
            onClick={this.handleSubmit}
            >SUBMIT</button>
            </>
        )   
    }
}

export default Form;