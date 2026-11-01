/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
   * A build and a dev server share `.next` and fight over it, so a build run
   * while somebody else has the site open leaves them with EINVAL readlink
   * errors and a dev server that will not start until the folder is deleted.
   * Setting NEXT_DIST_DIR sends a build or a second dev server somewhere else
   * and leaves the running one alone.
   *
   * The portal has had this since August. The marketing site did not, which is
   * how a verification build in this folder took out another session's dev
   * server.
   *
   * Production is untouched: Vercel sets nothing, so this stays `.next`.
   */
  ...(process.env.GGM_LOCAL_BUILD === '1' ? { cleanDistDir: false, experimental: { webpackBuildWorker: false, workerThreads: false, cpus: 1 } } : {}),
  distDir: process.env.NEXT_DIST_DIR || '.next',
}

export default nextConfig
