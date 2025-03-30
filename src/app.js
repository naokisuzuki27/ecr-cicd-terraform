document.addEventListener('DOMContentLoaded', function() {
    // 要素の取得
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    
    // ローカルストレージからToDoリストを取得
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // ToDoリストを表示
    renderTodos();
    
    // 「追加」ボタンのクリックイベント
    addButton.addEventListener('click', addTodo);
    
    // Enter キーでも追加できるようにする
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // ToDoを追加する関数
    function addTodo() {
        const todoText = todoInput.value.trim();
        
        if (todoText !== '') {
            // 新しいToDoをリストに追加
            todos.push({
                id: Date.now(),
                text: todoText,
                completed: false
            });
            
            // 入力フィールドをクリア
            todoInput.value = '';
            
            // ToDoリストを更新
            saveTodos();
            renderTodos();
        }
    }
    
    // ToDoリストを保存する関数
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // ToDoリストを表示する関数
    function renderTodos() {
        // リストをクリア
        todoList.innerHTML = '';
        
        // 各ToDoをリストに追加
        todos.forEach(function(todo) {
            const li = document.createElement('li');
            li.className = 'todo-item' + (todo.completed ? ' completed' : '');
            li.setAttribute('data-id', todo.id);
            
            const span = document.createElement('span');
            span.className = 'todo-text';
            span.textContent = todo.text;
            
            // クリックで完了/未完了を切り替え
            span.addEventListener('click', function() {
                toggleComplete(todo.id);
            });
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.textContent = '削除';
            
            // 削除ボタンのクリックイベント
            deleteButton.addEventListener('click', function() {
                deleteTodo(todo.id);
            });
            
            li.appendChild(span);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }
    
    // ToDoの完了状態を切り替える関数
    function toggleComplete(id) {
        todos = todos.map(function(todo) {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        
        saveTodos();
        renderTodos();
    }
    
    // ToDoを削除する関数
    function deleteTodo(id) {
        todos = todos.filter(function(todo) {
            return todo.id !== id;
        });
        
        saveTodos();
        renderTodos();
    }
});