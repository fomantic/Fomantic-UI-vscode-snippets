class SnippetVariant {
    private extension: string;
    private jsonSnippets: any

    constructor(newExtension: string) {
        this.extension = newExtension;
        this.jsonSnippets = {};
    }


    public get Extension(): string {
        return this.extension;
    }

    public get Snippets(): Object {
        return this.jsonSnippets;
    }


    addJsonFileSnippet(component: any) {
        for (var key in component) {
            this.jsonSnippets[key] = component[key];
        }
    }
}

export default SnippetVariant;