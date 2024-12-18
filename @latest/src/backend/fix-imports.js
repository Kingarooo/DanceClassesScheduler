import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Fix imports in all .js files in dist
const fixImports = (dir) => {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      fixImports(fullPath);
    } else if (file.endsWith('.js')) {
      let content = readFileSync(fullPath, 'utf8');
      content = content.replace(/from\s+(['"])(\.\/.*?)(['"])/g, (match, p1, p2, p3) => {
        if (!p2.endsWith('.js')) return `from ${p1}${p2}.js${p3}`;
        return match;
      });
      writeFileSync(fullPath, content);
    }
  }
};

fixImports('./dist');
