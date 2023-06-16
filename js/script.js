var SelectedOptions = {
    "Base": 0,
    "Eyes": 0,
    "Mouth": 0
}

const SelectionOptions = [
    {
        "Category":"Base",
        "FolderPath":"9696_img/Base",
        "Options": [
            {
                "ImageLabel":"Base",
                "ImagePath":"9696_img/Base/Base_1.png"
            }
        ]
    },
    {
        "Category":"Eyes",
        "FolderPath":"9696_img/Eyes",
        "Options": [
            {
                "ImageLabel":"Eyes1",
                "ImagePath":"9696_img/Eyes/Eyes_1.png"
            },
            {
                "ImageLabel":"Eyes2",
                "ImagePath":"9696_img/Eyes/Eyes_2.png"
            }
        ]
    }
]

CreateSelection_Main()
init_Img()

function init_Img(){
    $("#Canvas_Container").html(`<canvas id="ModelCanvas" width="200" height="200" style="border:1px solid grey;"></canvas>`)
    const canvas_model = document.getElementById("ModelCanvas");
    const ctx_model = canvas_model.getContext("2d");

    var knight_base = CreateImg(ctx_model,'Base',SelectedOptions["Base"])
    var knight_Eyes = CreateImg(ctx_model,"Eyes",SelectedOptions["Eyes"])
    var knight_Mouth = CreateImg(ctx_model,"Mouth",SelectedOptions["Mouth"])
}

function CreateImg(_ctx_model,_category,_index){

    var Select_CategoryOption = SelectionOptions.find(FindCategory => FindCategory.Category == _category)

    console.log(Select_CategoryOption)
    if (Select_CategoryOption!= undefined){

        var FilePath = Select_CategoryOption.Options[_index].ImagePath
        console.log(FilePath)

        const img = new Image();
        img.onload = () => {
            _ctx_model.drawImage(img, 0, 0,200,200);
    
        };
        img.src = FilePath;
    
        return img
    }

    
}

function CreateSelection_Main(){
    SelectionOptions.forEach(function(eachCatergory){
        CreateSelection_Each(eachCatergory)
    })
}

function CreateSelection_Each(_options){

    var HTML_Selection = `<div id="`+_options.Category+`_Selection"></div>`;
    $("#Selection_Container").append(HTML_Selection)

    var HTML_OptionBtn = "";
    _options.Options.forEach(function(eachOption, option_index){
        HTML_OptionBtn += `<button class="SelectionBtn" 
        style="background-image: url('`+eachOption.ImagePath+`');"  
        data-category="`+_options.Category+`" 
        data-index="`+option_index+`" 
        onclick="UpdateImg(this)"
        ></button>`
    })
    $("#"+_options.Category + "_Selection").append(HTML_OptionBtn)
   
}

function UpdateImg(_elem){
    var _caterory = $(_elem).data('category')
    var _NewVal = $(_elem).data('index')

    SelectedOptions[_caterory] = _NewVal
    
    init_Img()
}