{% raw %}
{{#view App.ActiveOrderView id="active-order"}}
    {{#with order }}
    <h1>{{dueDateString}}</h1>
    <ul>
        {{#each items}}
        <li>
            {{#view App.OrderItemView itemBinding="this"}}
                {{item.menuItem.title}} - {{item.amount}} -
                <a href="#" {{action "remove"}}>-1</a>
            {{/view}}
        </li>
        {{/each}}
    </ul>
    {{/with}}

    <a href="#" {{action "commit"}}>Save order</a>
{{/view}}
{% endraw %}