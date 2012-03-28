{% raw %}
{{#view App.ActiveOrderView id="active-order"}}
    {{#with order }}
    <h1>{{dueDateString}}</h1>
    <ul>
        {{#each items}}
        <li>
            {{menuItem.title}}
        </li>
        {{/each}}
    </ul>
    {{/with}}

    <a href="#" {{action "commit"}}>Save order</a>
{{/view}}
{% endraw %}