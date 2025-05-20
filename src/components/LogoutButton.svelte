<script>
    import "./hanko-style.css"

    import { Hanko } from "@teamhanko/hanko-elements";
    import { goto } from "$app/navigation";
    import { env } from "$env/dynamic/public";
    const hankoApi = env.PUBLIC_HANKO_API_URL;
  
    const hanko = new Hanko(hankoApi);
    const logout = () => {
      hanko.logout().catch((error) => {
        //Handle Error
        console.log("Error during logging out : " + error);
      });
      goto("/")
    };
  </script>
  
  <button on:click={logout}>Sign-Out</button>