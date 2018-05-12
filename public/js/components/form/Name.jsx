const React = require('react');

export default (props) => {
    const nm = props.nameOfUser;
    const sr = props.surnameOfUser;
    return <fieldset accessKey="n">
        <legend>Name</legend>
        <div className="form-label-group">
            <input className="form-control" id="inputName" name="givenName" placeholder="First name"
                   pattern={nm.pattern.toString().slice(1, -1)} title={nm.validate.message} minLength={nm.minlength[0]}
                   autoFocus required type="text"/>
            <label htmlFor="inputName">First name</label>
        </div>
        <div className="form-label-group">
            <input className="form-control" id="inputSurname" name="familyName" placeholder="Family name"
                   pattern={sr.pattern.toString().slice(1, -1)} title={sr.validate.message} minLength={sr.minlength[0]}
                   required type="text"/>
            <label htmlFor="inputSurname">Family name</label>
        </div>
    </fieldset>;
};