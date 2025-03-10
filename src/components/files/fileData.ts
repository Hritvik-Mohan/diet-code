// export const files = {
//     'script.js': {
//         name: 'script.js',
//         language: 'javascript',
//         value: `// Some JavaScript code example\nconsole.log('Hello, world!');`,
//     },
//     'style.css': {
//         name: 'style.css',
//         language: 'css',
//         value: `/* Some CSS code example */\nbody { background-color: lightblue; }`,
//     },
//     'index.html': {
//         name: 'index.html',
//         language: 'html',
//         value: `<!-- Some HTML code example -->\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Monaco Editor</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>`,
//     },
// };


export const files = {
    javascript: `// Boilerplate JavaScript code example\nconsole.log('Hello, world!');`,
    typescript: `// Boilerplate TypeScript code example\ntype User = {\n  name: string;\n  age: number;\n};\n\nconst greet = (user: User): string => {\n  return \`Hello, \${user.name}!\`;\n};\n\nconst user: User = { name: 'Alice', age: 25 };\nconsole.log(greet(user));`,
    python: `# Boilerplate Python code example\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Hritvik"))`,
    java: `// Boilerplate Java code example\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    reactjs: `// React.js Boilerplate
const App = () => {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Welcome to the React.js boilerplate.</p>
    </div>
  );
};
`,

};

export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    reactjs: "18.0.0"
}