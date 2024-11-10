import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/uploadthing(.*)'])

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
<<<<<<< HEAD
    auth.protect()
=======
    auth().protect
>>>>>>> d6a9abe1a104fffc9a85d4fb7c6f314e0133946b
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};



