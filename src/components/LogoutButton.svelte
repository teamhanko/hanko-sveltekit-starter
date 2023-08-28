<script>
  import { Hanko } from "@teamhanko/hanko-elements";
  import { goto } from "$app/navigation";
  import { env } from "$env/dynamic/public";
  const hankoApi = env.PUBLIC_HANKO_API_URL;
  
  const hanko = new Hanko(hankoApi);
  const logout = () => {
    hanko.user.logout().catch((error) => {
      // handle error
    });
    goto("/login")
  };
</script>

<button on:click={logout}>Logout</button>
