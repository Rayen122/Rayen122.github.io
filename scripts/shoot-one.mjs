// Re-shoot a single target from scripts/shoot.mjs: node scripts/shoot-one.mjs <key>
import { spawn } from 'node:child_process'
const key = process.argv[2]
if (!key) { console.error('usage: node scripts/shoot-one.mjs <key>'); process.exit(1) }
spawn('node', ['scripts/shoot.mjs'], { stdio: 'inherit', env: { ...process.env, ONLY: key } })
