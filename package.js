Package.describe({
	name: "stefcud:climbing-grade",
	version: "1.1.1",
	summary: "Conversion of climbing grades",
	git: "https://github.com/Grantismo/climbing-grade.js.git"
});

Package.on_use(function (api, where) {
	api.addFiles('climbing-grade.js', ['client','server']);
});
