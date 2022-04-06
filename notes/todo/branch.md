# Troubleshooting

- On app start the 'item' property exists in linkedModules
- After the transformation, the local Component state gets updated. However, the FE state should still have the 'item' property in linkedModules
- Upon adding the item, the FE state is shown to have the 'item' property in only the last one of the linkedModules. WHY DON'T THE OTHER MODULES HAVE IT?
- It is guessed that the actions like addItem and removeItem are not being called properly, also because of the same reason.(item property is not being found in the FE state)
- The check of POlist & ModuleList length is not working properly. It also stops rendering if not items are present in po modules.
