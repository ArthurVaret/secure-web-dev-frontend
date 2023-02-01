<script>
    import {page} from '$app/stores';
</script>
<div class="container">
    <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
            <li class="nav-item">
                <a href="/locations" class= "nav-link" class:active={$page.url.pathname==="/locations"}>
                    Paris filming locations
                </a>
            </li>
            <li>
                <a href="/register" class= "nav-link" class:active={$page.url.pathname==="/register"}>
                    Register
                </a>
            </li>
            <li>
                <a href="/login" class="nav-link" class:active={$page.url.pathname==="/login"} >
                    Sign in
                </a>
            </li>
            <li>
                <a href="/myaccount" class="nav-link" class:active={$page.url.pathname==="/myaccount"} >
                    My account
                </a>
            </li>
        </ul>
        <hr>
    </header>
</div>