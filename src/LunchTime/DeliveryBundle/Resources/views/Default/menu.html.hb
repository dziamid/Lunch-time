{% raw %}
{{#view App.MenuView id="menu"}}
    <h1>{{menu.dueDateString}}</h1>
    {{#with menu }}
        {{#each items}}
            {{#view App.MenuItemView itemBinding="this"}}
                {{item.title}}
            {{/view}}
        {{/each}}
    {{/with}}
{{/view}}
{% endraw %}