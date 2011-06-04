enyo.kind({
	name: "App",
	kind: enyo.VFlexBox,
	components: [
		{kind: "EditorPanel", flex: 1},
		{kind: "AppMenu", components: [
			{caption: "Documents", components: [
				{caption: "Seminar" },
				{caption: "Studienarbeit" }
			]},
			{caption: "Help", components: [
				{caption: "Markdown Syntax", name:"markdownHelp", onclick: "displayHelp"},
				{caption: "Typewriter Syntax", name:"typewriterHelp", onclick: "displayHelp"},
			]},
			{caption: "Print", name:"print", onclick: "printDocument"}
		]},
		{kind: enyo.ApplicationEvents, 
			onWindowDeactivated: "sleep",
			onWindowActivated: "wakeup"
		},
		{name: "markdownHelper", kind:"markdownHelper"},
		{name: "typewriterHelper", kind:"typewriterHelper"},
		{kind: "Scrim", name:"scrim", layoutKind: "VFlexLayout", align:"end", pack:"end", style:"background-color: transparent; opacity: 1;", components: [
			{kind: "Image", src:"images/bigicon.png", style: "margin-right: 20px; margin-bottom: 65px;"}
		]}
	],
	
	sleep: function() {
		//if(this.position == "down")
		//	this.$.top.node.style.height = enyo.fetchControlSize(this).h + "px";
		this.$.scrim.show();
	},
	
	wakeup: function() {
		//this.$.top.node.style.height = (enyo.fetchControlSize(this).h - 55 - enyo.keyboard.height) + "px";
		this.$.scrim.hide();
	},
	
	printDocument: function() {
		this.$.editorPanel.printDocument();
	},
	displayHelp: function(inSender) {
		if(inSender.name == "markdownHelp")
			this.$.markdownHelper.openAtCenter();
		else
			this.$.typewriterHelper.openAtCenter();
	}
})
