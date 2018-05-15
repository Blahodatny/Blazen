const React = require('react');

export default (props) => {
    const psw = props.password;
    return <fieldset accessKey="p">
        <legend>Password</legend>
        <div className="form-label-group">
            <input className="form-control" id="inputPassword" name="password" placeholder="Password"
                   pattern={psw.pattern.toString().slice(1, -1)} title={psw.validate.message}
                   minLength={psw.minlength[0]}
                   required type="password"/>
            <label htmlFor="inputPassword">Password</label>
        </div>
        <div className="form-label-group">
            <input className="form-control" id="inputConfirmPassword" name="confirmPassword"
                   placeholder="Confirm password"
                   autoComplete="off" required type="password"/>
            <label htmlFor="inputConfirmPassword">Confirm password</label>
        </div>
    </fieldset>;
}