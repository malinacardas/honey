import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    gender: null,
    genders: null,
    error: "",
    rebornS: service('reborn-service'),
    // event: null,
    successMessageShowed: false,
    isUsernameValid: true,
    isPasswordValid: true,
    isConfirmedPasswordValid: true,
    isEmailValid: true,
    // isAgeValid: true,
    popUpMessage: "PREPARE FOR THE RACE!",


    init() {
        this._super(...arguments);
        // this.set('genders', ['F', 'M', 'O']);
        // this.rebornS.getEvent().then(resp => this.set('event', resp))
    },

    validateString: function(string) {
        if (string) {
            let trimedString = string.trim();
            if (trimedString != "") {
                return true;
            }
        }
        return false;
    },
    validateNameString:function(string){
        if(string){
            let trimedString=string.trim();
            if(trimedString!="" && trimedString.length<=30){
                return true;
            }
        }
        return false;
    },

    validatePhone: function(phone) {
        if (this.validateString(phone) && phone.match(/^[+]?[0-9]{6,16}$/)) {
            return true;
        }
        
        return false;
    },
    
    validateEmail: function(email) {
        if (this.validateString(email) && email.match(/^\S+@\S+\S+.\S+$/)) {
            return true;
        }
        return false;
    },

    validateAge: function(age) {
        if(age){
           age = Number(age)
           if(age>0 && age<=99){
               return true;
        }
        return false;
        }
    },
    
    validateAllRequired: function(firstName, lastName, phone, email) {
        if (this.validateNameString(firstName) && this.validateNameString(lastName) && this.validateString(phone) && this.validateString(email)) {
            return true;
        }
        return false;
    },

    validateInputsValue: function(phone, email) {
        if (this.validatePhone(phone) && this.validateEmail(email)) {
            return true;
        }
        return false;
    },
    saveRegistration(username,email,password) {
        let self = this;
        this.rebornS.postRegistration(username, email, password).then(function() {
            // self.toggleProperty("successMessageShowed");
            // self.set("gender", null);
            // self.set("age", null);
            self.set("email", null);
            self.set("password", null);
            self.set("confirmedpassword", null);
            self.set("username", null);
            console.log(username);
            // console.log("this",id)
            self.transitionToRoute('events.index',username);
        });
    },

    actions: {

        setGender(gender) {
            this.set("gender", gender)
        },
        toggleSuccessMessageShowed() {
            this.toggleProperty('successMessageShowed');
        },
        passwords(id) {
            this.transitionToRoute('events.index', id);
        },
        createParticipant: function() {
            

            this.set("isUsernameValid", this.validateNameString(this.get("username")));
            this.set("isPasswordValid", this.validateNameString(this.get("password")));
            // this.set("isPhoneValid", this.validateString(this.get("phone")));
            this.set("isEmailValid", this.validateString(this.get("email")));
            // this.set("isAgeValid", this.validateAge(this.get("age")));

            // if (!this.validateAllRequired(this.get("firstName"), this.get("lastName"), this.get("phone"), this.get("email"))) {
            //     this.set("error", "Add input to all the required fields")
            // } else if (!this.validateInputsValue(this.get("phone"), this.get("email"))) {
            //     this.set("isPhoneValid", this.validatePhone(this.get("phone")));
            //     this.set("isEmailValid", this.validateEmail(this.get("email")));
            //     this.set("error", "There are fields with invalid inputs")
            // } else if (!this.validateAge(this.get("age"))) {
            //     this.set("isAgeValid", this.validateAge(this.get("age")));
            //     this.set("error", "There are fields with invalid inputs")
            // } else {
            //     this.set("error", "")
            //     let name = this.get("firstName") + " " + this.get("lastName");
            //     let goodAge = this.get("age");
            //     if (goodAge) {
            //         goodAge = goodAge.trim()
            //     } else {
            //         goodAge = null;
            //     }
            //     let goodGender = this.get("gender")
            //     if (!goodGender) {
            //         goodGender = null;
            //     }
                
            this.saveRegistration(this.get("username"),this.get("email"),this.get("password"))
            // }
        },
    }
});