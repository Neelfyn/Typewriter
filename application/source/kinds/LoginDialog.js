enyo.kind({
	name: "LoginDialog",
	kind: enyo.ModalDialog,
	caption: $L("Login"),
	events: {
		onSubmit: "",
	},
	components: [
		{kind:"RowGroup", components: [
			{kind: "Input", hint: $L("E-Mail Address"), name:"username", 
				spellcheck: false,
				autocorrect: false,
				autoCapitalize: "lowercase",
				autoWordComplete: false,
				selectAllOnFocus: true
			},
			{kind: "PasswordInput", hint: $L("Password"), name:"password" }
		]},
		{kind:"Spacer", height: "10px"},
		{content: $L("Typewriter will not save your emailadress or password. You can revoke Typewriter's access to you files at any time via your <a href=\"https://www.dropbox.com/account#applications\">Dropbox account preferences</a>."), className: "smallhint"},
		{kind:"Spacer", height: "20px"},
		{kind: "HFlexBox", components: [
			{kind: "ActivityButton", name: "reset", flex: 1, caption: $L("Reset"), onclick: "resetHandler"},
			{kind: "ActivityButton", name:"login", flex: 1, caption: $L("Login"), className: "enyo-button-dark", default: true, onclick: "buttonHandler"}
		]}
		
	],
	keypressHandler: function(inSender, inEvent) {
		if(inEvent.keyCode == 13) {
			enyo.keyboard.forceHide();
			console.log("KEYCOOOOODE");
			this.buttonHandler();
		}
	},
	buttonHandler: function() {
		this.$.login.setActive(true);
		this.$.login.setDisabled(true);
		this.$.reset.setDisabled(true);
		this.doSubmit({ username: this.$.username.getValue(), password: this.$.password.getValue() });
	},
	resetHandler: function() {
		this.doSubmit({ username: "", password: "" });
	},
	setActive: function(inValue) {
		this.$.login.setActive(inValue);
		this.$.login.setDisabled(inValue);
		this.$.reset.setDisabled(inValue);
	},
	rendered: function() {
		enyo.keyboard.show();
	}
});
