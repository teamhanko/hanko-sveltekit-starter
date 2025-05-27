<script>
	import LogoutButton from './../components/LogoutButton.svelte';
    import { onMount } from 'svelte';
    import { page } from '$app/stores'; // if using SvelteKit
    import { get } from 'svelte/store';

    import { env } from "$env/dynamic/public";
    const hankoApi = env.PUBLIC_HANKO_API_URL;
    import { Hanko } from '@teamhanko/hanko-elements';

    import './hanko-starter-style.css';
  
    let email = '';
    let pathname = '';
  
    async function fetchUserData() {
      const hanko = new Hanko(hankoApi);
      const email = (await hanko.getUser())?.emails?.[0]?.address;

      return { email: email };
    }
  
    onMount(async () => {
      const data = await fetchUserData();
      email = data.email ?? "UNDEFINED";
  
      pathname = get(page).url.pathname;
    });
  </script>
  
  <div class="starterHeader">
    <div class="headerGap"></div>
    <div class="userMenu">
      <div class="userInfo">
        <h1>{email}</h1>
        <img src="/userpfp.png" alt="User profile" />
        <img src="/expand.png" alt="Expand" class="expandIcon" />
      </div>
      <div class="userDropdown">
        {#if pathname.includes('profile')}
          <a href="/dashboard">
            <button>Dashboard</button>
          </a>
        {:else}
          <a href="/profile">
            <button>Profile</button>
          </a>
        {/if}
        <LogoutButton />
      </div>
    </div>
  </div>
  