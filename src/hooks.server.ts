import { type RequestEvent, redirect, type Handle } from "@sveltejs/kit";

import { env } from "$env/dynamic/public";

const hankoApiUrl = env.PUBLIC_HANKO_API_URL;

const authenticatedUser = async (event: RequestEvent) => {
  const { cookies } = event;
  const cookieToken = cookies.get("hanko");
  

  const validationOptions = { 
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: `{"session_token":"${cookieToken}"}`
    }

  try {
    const response = await fetch(hankoApiUrl + '/sessions/validate', validationOptions);

    if (!response.ok) throw new Error('Session validation failed');
    
    
    const verifiedResponse = await response.json();
    console.log(verifiedResponse)

    return verifiedResponse.is_valid;
    
  } catch (error) {
    console.log(error)
    return false;
  }
};

export const handle: Handle = async ({ event, resolve }) => {
  const verified = await authenticatedUser(event);

  if (event.url.pathname.startsWith("/dashboard") && !verified) {
    throw redirect(303, "/");
  }

  if (event.url.pathname.startsWith("/profile") && !verified) {
    throw redirect(303, "/");
  }

  const response = await resolve(event);
  return response;
};

