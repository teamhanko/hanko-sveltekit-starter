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
    let id = '';
    let pathname = '';
  
    async function fetchUserData() {
      const hanko = new Hanko(hankoApi);
      // @ts-ignore
      // getUser currently returns the wrong value (email instead of emails)
      // For future hanko versions use .emails[0].address
      const email = (await hanko.getUser()).email;
      // @ts-ignore
      // getUser currently returns the wrong value (id instead of user_id)
      // For future hanko versions use .user_id
      const id = (await hanko.getUser()).id;

      return { email: email, id: id };
    }
  
    onMount(async () => {
      const data = await fetchUserData();
      email = data.email;
      id = data.id;
  
      pathname = get(page).url.pathname;
    });
</script>
  
<div class='hankoStarterDashboard'>
    <h1>Dashboard</h1><br />
    <h2>Here is an example of using the Hanko SDK to get and display user data.</h2>
    <h3>Email: {email}</h3>
    <h3>Id: {id}</h3>
</div>